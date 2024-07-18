'use client'
import { App, Table } from "antd";
import styles from "./page.module.css";
import ReasubleTable from "./components/ReusableTable/ReasubleTable";

export default function Home() {
  return (
    <main>
      <ReasubleTable/>
    </main>
  );
}
