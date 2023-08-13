import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useContext } from "react";
import NotificationContext from "@/store/notification-context";

function UserProfile() {
  const notificationCtx = useContext(NotificationContext);

  async function changePasswordHandler(passwordData) {
    notificationCtx.showNotification({
      title: "Changing password...",
      message: "Changing password for your account.",
      status: "pending",
    });
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
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
          message: "Successfully changed your password.",
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

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
