import { useRef, useState } from "react";
import "./App.css";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import confetti from "canvas-confetti";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseMove = (e: any) => {
    const button = yesButtonRef.current;
    if (!button) return;

    // Get button position and dimensions
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Calculate distance between mouse and button center
    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) +
        Math.pow(e.clientY - buttonCenterY, 2),
    );

    // If mouse is within 100px, move the button
    if (distance < 20) {
      const newX = Math.random() * (window.innerWidth - rect.width);
      const newY = Math.random() * (window.innerHeight - rect.height);

      button.style.position = "fixed";
      button.style.left = `${newX}px`;
      button.style.top = `${newY}px`;
    }
  };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;


  const confettiTrigger = () => {

    var defaults = {
      scalar: randomInRange(2, 8),
      spread: 180,
      ticks: 60,
      zIndex: 9999,
      particleCount: 500,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      startVelocity: 30,
      colors: ['#ff0000', '#ff4d4d', '#ff9999', '#ffe6e6']
    };
var heartShape = confetti.shapeFromPath({
  path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z'
});
    const duration = 5 * 1000; // 5 seconds
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Launch heart shapes from random horizontal positions
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        shapes: [heartShape], // Use the custom shape
        scalar: randomInRange(1, 2)
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        shapes: [heartShape], // Use the custom shape
        scalar: randomInRange(1, 2)
      });
    }, 250);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleYes = () => {
    setModalOpen(true);
    confettiTrigger();
  };

  return (
    <>
      <div className="form-box" onMouseMove={handleMouseMove}>
        <div className="card">
          <h1>Hi Akhila ❤️</h1>
          <h2>Will you be my valentine?</h2>
          <div className="buttons">
            <button onClick={handleYes}>Yes</button>
            <button
              className="moving-button"
              ref={yesButtonRef}
              style={{ transition: "all 0.2s ease" }}
            >
              No
            </button>
          </div>
        </div>
        <Dialog open={modalOpen} onClose={handleClose} fullWidth={true}>
          <DialogTitle sx={{ textAlign: "center" }}>Yassss!!!</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/cat-kiss.gif" />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default App;
