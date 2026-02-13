import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { User } from "lucide-react"

export function AuthDialog() {
  const auth = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")

  // Form fields
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Sign In
    if (!username || !password) {
      setError("Username and password are required")
      return
    }
    const success = auth?.login(username, password)
    if (success) {
      setOpen(false)
      resetForm()
    } else {
      setError("Invalid username or password")
    }
  }

  const resetForm = () => {
    setUsername("")
    setPassword("")
    setError("")
  }

  if (auth?.isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          {auth.user?.username}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={auth.logout}
          className="text-xs"
        >
          Logout
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
          onClick={() => setOpen(true)}
        >
          <User size={18} />
          Sign In
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in to your account to continue shopping
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        {/* Demo credentials hint */}
        <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p>Username: <code className="bg-white px-1">john_doe</code></p>
          <p>Password: <code className="bg-white px-1">password123</code></p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
