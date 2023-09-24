import PersonalNotes from "@/components/PersonalNotes";
import SideBar from "@/components/SideBar";
import TaskPopUp from "@/components/TaskPopUp";

export default function Home() {
  return (
    <main
      className="flex"
    >
      <SideBar />
      <PersonalNotes />
    </main>
  )
}
