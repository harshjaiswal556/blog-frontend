//This is the whole layout of the page

import Header from "./Header";
import { Outlet } from "react-router";
export default function Layout() {
    return (
        <main>
            <Header />
            {/* Hello */}
            <Outlet />
        </main>
    )
}