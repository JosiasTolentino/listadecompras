import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");

  const formatCurrency = (value) => {
    // Remove qualquer caractere não numérico, exceto vírgula e ponto
    const numericValue = value.replace(/[^0-9.,]/g, "");

    // Substitui vírgulas por pontos para manter uma formatação uniforme
    const formattedValue = numericValue.replace(/,/g, ".");

    // Formata o valor com duas casas decimais
    const numberWithTwoDecimals = parseFloat(formattedValue).toFixed(2);

    // Formata o valor para exibir vírgula como separador de casas decimais
    return numberWithTwoDecimals.replace(".", ",");
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrency(inputValue);
    setInputValue(formattedValue);
  };

  return (
    <div>
      <form>
        <label>
          Valor em Reais:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
      </form>
    </div>
  );
}

export default App;
