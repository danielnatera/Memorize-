import { render, fireEvent, screen } from "@testing-library/react";
import Settings from "./Settings";

// Mock para las funciones que pasas como props
const mockSaveUsername = jest.fn();
const mockSetOpenSettings = jest.fn();
const mockSetCurrentDifficulty = jest.fn();
const mockResetGame = jest.fn();

describe("Settings Modal", () => {
  it("cierra el modal al hacer clic en el botón cerrar", () => {
    // Renderiza el componente con el modal abierto
    render(
      <Settings
        username="User"
        saveUsername={mockSaveUsername}
        openSettings={true}
        setOpenSettings={mockSetOpenSettings}
        setCurrentDifficulty={mockSetCurrentDifficulty}
        currentDifficulty="medium"
        resetGame={mockResetGame}
      />
    );

    // Busca el botón cerrar por su texto y simula un clic
    const closeButton = screen.getByText(/cerrar/i);
    fireEvent.click(closeButton);

    // Verifica que se haya llamado la función para cerrar el modal
    expect(mockSetOpenSettings).toHaveBeenCalledWith(false);
  });

  // Puedes añadir más pruebas aquí para verificar el cambio de username, dificultad, etc.
});
