'use client'

export default function Header() {
  return (
    <header className="bg-primary-600 text-white safe-top">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-xl">C</span>
            </div>
            <h1 className="text-xl font-bold">カーリース</h1>
          </div>
        </div>
      </div>
    </header>
  )
}

