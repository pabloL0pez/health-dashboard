export const base64toBuffer = (base64string: string): Buffer => {
  return Buffer.from(base64string, 'base64');
}