import { Dialog } from '@base-ui/react/dialog';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { Button } from '../../components/ui/Button';
import { createQrFixture, fixtureMarker } from './fixtures';
export function Toolkit() {
  const [date, setDate] = useState<Date>();
  const [qr, setQr] = useState<string>();
  const [qrFailed, setQrFailed] = useState(false);
  useEffect(() => {
    let active = true;
    createQrFixture()
      .then((value) => {
        if (active) setQr(value);
      })
      .catch(() => {
        if (active) setQrFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);
  const selected = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    : 'No date selected';
  return (
    <div className="toolkit-grid" data-fixture={fixtureMarker}>
      <section className="panel">
        <h2>Accessible dialog</h2>
        <Dialog.Root>
          <Dialog.Trigger render={<Button />}>
            Open example dialog
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="dialog-backdrop" />
            <Dialog.Popup className="dialog-popup">
              <Dialog.Title>Example dialog</Dialog.Title>
              <Dialog.Description>
                Escape closes this dialog and returns focus to its button.
              </Dialog.Description>
              <Dialog.Close render={<Button />}>Close dialog</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </section>
      <section className="panel">
        <h2>Calendar control</h2>
        <DayPicker
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2026, 9, 1)}
        />
        <p role="status" aria-label="Selected date" aria-live="polite">
          {selected}
        </p>
      </section>
      <section className="panel">
        <h2>Development QR fixture</h2>
        {qr ? (
          <img src={qr} alt="Development QR fixture" width="144" height="144" />
        ) : (
          <p role="status">
            {qrFailed
              ? 'The QR fixture is unavailable.'
              : 'Preparing QR fixture.'}
          </p>
        )}
      </section>
    </div>
  );
}
