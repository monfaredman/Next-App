import { useState, useContext, useRef } from "react";
import { signIn } from "next-auth/react";
import NotificationContext from "@/store/notification-context";
import classes from "./auth-form.module.css";
import { useRouter } from "next/router";

function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    notificationCtx.showNotification({
      title: "Singing in...",
      message: "Singing in for your account.",
      status: "pending",
    });

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        password: enteredPassword,
        email: enteredEmail,
      });
      if (result.error) {
        notificationCtx.showNotification({
          title: "Error!",
          message: result.error || "Something went wrong!",
          status: "error",
        });
        return;
      }
      notificationCtx.showNotification({
        title: "Success!",
        message: "Successfully singed in.",
        status: "success",
      });
      router.replace("/");
    } else {
      fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((data) => {
            throw new Error(data.message || '"Something went wrong!"');
          });
        })
        .then(() => {
          notificationCtx.showNotification({
            title: "Success!",
            message: "Successfully registered for newsletter.",
            status: "success",
          });
        })
        .catch((error) => {
          notificationCtx.showNotification({
            title: "Error!",
            message: error.message || "Something went wrong!",
            status: "error",
          });
        });
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailInputRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
