import Container from "@components/Container";
import TimeRadioGroup from "@components/TimeRadioGroup";
import Clock from "@/components/Clock";
import logo from "@assets/logo.svg";
import SettingsDialog from "@components/SettingsDialog";

export default function App() {
  return (
    <main className="bg-blue-850 h-dvh place-content-center font-sans">
      <Container>
        <div className="grid justify-items-center gap-y-10">
          <img src={logo} alt="pomodoro logo" />
          <TimeRadioGroup />
        </div>

        <div className="grid justify-items-center gap-y-20">
          <Clock />
          <SettingsDialog />
        </div>
      </Container>
    </main>
  );
}
