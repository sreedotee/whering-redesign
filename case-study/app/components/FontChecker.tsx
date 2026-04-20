'use client'

import { useState, useRef, useEffect } from 'react'
import { Copy, Maximize2, Upload } from 'lucide-react'

interface BoundingBox {
  top: number
  left: number
  width: number
  height: number
}

export default function FontChecker() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [fontSize, setFontSize] = useState('16')
  const [fontWeight, setFontWeight] = useState('400')
  const [selector, setSelector] = useState('')
  const [message, setMessage] = useState('')
  const [clipboardInput, setClipboardInput] = useState('')
  const [boundingBox, setBoundingBox] = useState<BoundingBox | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const boundingBoxRef = useRef<HTMLDivElement>(null)

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 2000)
  }

  // Enable element selection mode
  const toggleSelectMode = () => {
    setIsSelecting(!isSelecting)
    if (!isSelecting) {
      document.body.style.cursor = 'crosshair'
    } else {
      document.body.style.cursor = 'auto'
      setBoundingBox(null)
    }
  }

  // Handle element selection
  useEffect(() => {
    if (!isSelecting) return

    const handleMouseMove = (e: MouseEvent) => {
      let target = e.target as Element
      if (target === panelRef.current || panelRef.current?.contains(target)) {
        setBoundingBox(null)
        return
      }

      // Drill down to find actual text element if hovering on a button or container
      if (target.tagName === 'BUTTON' && target.children.length > 0) {
        const textChild = target.querySelector('span, p, div')
        if (textChild) {
          target = textChild
        }
      }

      // Get bounding box
      const rect = target.getBoundingClientRect()
      setBoundingBox({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      })
    }

    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      let target = e.target as Element
      if (target === panelRef.current || panelRef.current?.contains(target)) {
        return
      }

      // Drill down to find actual text element if clicking on a button or container
      if (target.tagName === 'BUTTON' && target.children.length > 0) {
        const textChild = target.querySelector('span, p, div')
        if (textChild) {
          target = textChild
        }
      }

      // Get element info
      const computedStyle = window.getComputedStyle(target)
      const fontSize = computedStyle.fontSize
      const fontWeight = computedStyle.fontWeight

      // Try to get a useful selector
      let selectorStr = target.tagName.toLowerCase()
      if (target.id) selectorStr = `#${target.id}`
      else if (target.className) {
        selectorStr = `.${(target.className as string).split(' ').join('.')}`
      }

      setSelectedElement(target)
      setFontSize(fontSize.replace('px', ''))
      setFontWeight(fontWeight)
      setSelector(selectorStr)
      setIsSelecting(false)
      setBoundingBox(null)
      document.body.style.cursor = 'auto'
      showMessage('Element selected!')
    }

    document.addEventListener('mousemove', handleMouseMove, true)
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove, true)
      document.removeEventListener('click', handleClick, true)
    }
  }, [isSelecting])

  // Apply changes to selected element
  const applyChanges = () => {
    if (!selectedElement) {
      showMessage('No element selected')
      return
    }

    const element = selectedElement as HTMLElement
    element.style.fontSize = `${fontSize}px`
    element.style.fontWeight = fontWeight
    showMessage('Changes applied!')
  }

  // Export as prompt
  const exportAsPrompt = () => {
    const prompt = `Font Settings Snapshot:
Selector: ${selector}
Font Size: ${fontSize}px
Font Weight: ${fontWeight}

To apply these settings, paste this message back into the FontChecker.`

    navigator.clipboard.writeText(prompt)
    showMessage('Prompt copied to clipboard!')
  }

  // Import from prompt
  const importFromPrompt = () => {
    const sizeMatch = clipboardInput.match(/Font Size:\s*(\d+)/)
    const weightMatch = clipboardInput.match(/Font Weight:\s*(\d+)/)

    if (sizeMatch && weightMatch) {
      setFontSize(sizeMatch[1])
      setFontWeight(weightMatch[1])
      applyChanges()
      setClipboardInput('')
      showMessage('Settings imported and applied!')
    } else {
      showMessage('Invalid format. Include "Font Size:" and "Font Weight:"')
    }
  }

  const resetChanges = () => {
    if (selectedElement) {
      const element = selectedElement as HTMLElement
      element.style.fontSize = ''
      element.style.fontWeight = ''
      showMessage('Changes reset!')
    }
  }

  return (
    <>
      {/* Bounding Box Overlay */}
      {isSelecting && boundingBox && (
        <div
          ref={boundingBoxRef}
          className="fixed pointer-events-none z-30 border-2 border-blue-500 bg-blue-500/10 rounded"
          style={{
            top: `${boundingBox.top}px`,
            left: `${boundingBox.left}px`,
            width: `${boundingBox.width}px`,
            height: `${boundingBox.height}px`,
            boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',
          }}
        />
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all"
        title="Toggle Font Checker"
      >
        <Maximize2 size={20} />
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed right-4 bottom-20 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50 max-h-[90vh] overflow-y-auto"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-lg text-gray-800">Font Checker</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 font-bold"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm">
                {message}
              </div>
            )}

            {/* Element Selection */}
            <div>
              <button
                onClick={toggleSelectMode}
                className={`w-full py-2 px-3 rounded font-medium transition-all ${
                  isSelecting
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {isSelecting ? '🎯 Selecting...' : '📍 Select Element'}
              </button>
              {selector && (
                <p className="text-xs text-gray-600 mt-2 break-words">
                  Selected: <code className="bg-gray-100 px-2 py-1 rounded">{selector}</code>
                </p>
              )}
            </div>

            {/* Font Size Control */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Font Size: <span className="text-blue-600">{fontSize}px</span>
              </label>
              <input
                type="range"
                min="8"
                max="96"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full cursor-pointer"
              />
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full mt-2 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="px"
              />
            </div>

            {/* Font Weight Control */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Font Weight: <span className="text-blue-600">{fontWeight}</span>
              </label>
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="100">Thin (100)</option>
                <option value="200">Extra Light (200)</option>
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={applyChanges}
                disabled={!selectedElement}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 px-3 rounded font-medium text-sm transition-all"
              >
                Apply
              </button>
              <button
                onClick={resetChanges}
                disabled={!selectedElement}
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white py-2 px-3 rounded font-medium text-sm transition-all"
              >
                Reset
              </button>
            </div>

            {/* Export/Import Section */}
            <div className="border-t pt-4 space-y-3">
              <button
                onClick={exportAsPrompt}
                disabled={!selectedElement}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-2 px-3 rounded font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <Copy size={16} />
                Copy as Prompt
              </button>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Paste Prompt to Import:
                </label>
                <textarea
                  value={clipboardInput}
                  onChange={(e) => setClipboardInput(e.target.value)}
                  placeholder="Paste your saved prompt here..."
                  className="w-full px-2 py-2 border border-gray-300 rounded text-xs font-mono resize-none h-20"
                />
              </div>

              <button
                onClick={importFromPrompt}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <Upload size={16} />
                Import from Clipboard
              </button>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-gray-700">
              <p className="font-semibold mb-1">How to use:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Click "Select Element" and click any text on the page</li>
                <li>Adjust font size and weight with sliders/inputs</li>
                <li>Click "Apply" to see live changes</li>
                <li>Use "Copy as Prompt" to save your settings</li>
                <li>Paste the prompt back to re-apply settings</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
