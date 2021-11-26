export default function generateID() {
  return Math.random().toString(36).slice(-6)
}
