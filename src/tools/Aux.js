export function formatBigInt(bigIntNumber, scaleFactor, decimalPlaces) {
    // Convert BigInt to string and move the decimal point
    const decimalValue = parseFloat(bigIntNumber.toString().slice(0, -scaleFactor) + "." + bigIntNumber.toString().slice(-scaleFactor));
  
    // Format the result with the specified decimal points
    return decimalValue.toFixed(decimalPlaces);
}
