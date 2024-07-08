
import { Header } from "./components/Header/Header";
import NewsComponent from "./components/news/newsComponent";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <main>
      <NewsComponent title="Top Hit Of the week" count="795,900" className={`${styles.fontSize}`}/>
    </main>
  )
}
