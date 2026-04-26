import type { ReactNode } from "react";
import SidebarNotes from "@/components/SidebarNotes/SidebarNotes";
import css from "../LayoutNotes.module.css";

export default function Layout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className={css.container}>
            <aside className={css.sidebar}>
                <SidebarNotes />
            </aside>

            <main className={css.notesWrapper}>
                {children}
            </main>
        </div>
    );
}