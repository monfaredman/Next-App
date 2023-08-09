import Link from "next/link";
import Button from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import classes from "./main-header.module.css";
import { Fragment } from "react";

function MainHeader() {
  const { data: session, status } = useSession();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
          {!session && status !== "loading" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && status !== "loading" && (
            <Fragment>
              <li>
                <Link href="/profile">Profile</Link>
              </li>

              <li>
                <Button onClick={() => signOut()}>Logout</Button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
