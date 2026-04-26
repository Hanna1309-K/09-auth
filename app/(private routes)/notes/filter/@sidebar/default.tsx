import Link from "next/link";
import css from "@/components/SidebarNotes/SidebarNotes.module.css";
import { Tag } from "@/types/tag";

const filters: (Tag | "all")[] = [
    "all",
    "Work",
    "Personal",
    "Todo",
    "Meeting",
    "Shopping",
];

export default function SidebarNotes() {
    return (
        <ul className={css.menuList}>
            {filters.map((item) => (
                <li key={item} className={css.menuItem}>
                    <Link
                        href={`/notes/filter/${item}`}
                        className={css.menuLink}
                    >
                        {item === "all" ? "All notes" : item}
                    </Link>
                </li>
            ))}
        </ul>
    );
}