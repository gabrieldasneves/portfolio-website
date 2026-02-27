'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useScroll } from '@/contexts/scroll-context'

const menuItems = [
  {
    href: '/',
    label: 'Home',
    color: 'purple',
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    ),
  },
  {
    href: '/projects',
    label: 'Projects',
    color: 'blue',
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
        />
        <line x1="12" y1="11" x2="12" y2="17" />
      </>
    ),
  },
  {
    href: '/contact',
    label: 'Contact',
    color: 'green',
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
  },
]

const colorClasses = {
  purple: {
    icon: 'border-gray-500/50 bg-gray-600/30 text-gray-400 group-hover:border-purple-400/60 group-hover:bg-purple-500/20 group-hover:text-purple-300 group-active:border-purple-400/60 group-active:bg-purple-500/20 group-active:text-purple-300',
    text: 'text-gray-400 group-hover:text-purple-200 group-active:text-purple-200',
  },
  blue: {
    icon: 'border-gray-500/50 bg-gray-600/30 text-gray-400 group-hover:border-blue-400/60 group-hover:bg-blue-500/20 group-hover:text-blue-300 group-active:border-blue-400/60 group-active:bg-blue-500/20 group-active:text-blue-300',
    text: 'text-gray-400 group-hover:text-blue-200 group-active:text-blue-200',
  },
  green: {
    icon: 'border-gray-500/50 bg-gray-600/30 text-gray-400 group-hover:border-green-400/60 group-hover:bg-green-500/20 group-hover:text-green-300 group-active:border-green-400/60 group-active:bg-green-500/20 group-active:text-green-300',
    text: 'text-gray-400 group-hover:text-green-200 group-active:text-green-200',
  },
}

export function FloatingMenu() {
  const pathname = usePathname()
  const scrollContext = useScroll()
  const filteredItems = menuItems.filter((item) => pathname !== item.href)
  const isHorizontal = pathname === '/projects' || pathname === '/contact'
  const scrollY = scrollContext?.scrollY ?? 0
  const isHidden = isHorizontal && scrollY > 0

  return (
    <ul
      className={`fixed z-30 flex gap-1 transition-all duration-300 ${
        isHidden ? '-translate-y-full opacity-0 pointer-events-none' : ''
      } ${
        isHorizontal
          ? 'left-1/2 top-4 -translate-x-1/2 flex-row border-b border-gray-600/50 pb-1'
          : 'left-4 top-24 flex-col w-14 border-l border-gray-600/50 pl-1'
      }`}
    >
      {filteredItems.map((item) => {
        const colors = colorClasses[item.color as keyof typeof colorClasses]
        return (
          <li
            key={item.href}
            className={`group overflow-hidden rounded-lg border-transparent transition-all duration-500 hover:bg-black/60 hover:backdrop-blur-sm hover:border-gray-500/50 hover:shadow-lg has-[:focus]:bg-black/60 has-[:focus]:backdrop-blur-sm has-[:focus]:border-gray-500/50 has-[:focus]:shadow-lg ${
              isHorizontal
                ? 'h-14 w-14'
                : 'w-14 hover:w-64 has-[:focus]:w-64 border-l'
            }`}
          >
            <Link
              href={item.href}
              className={`group peer flex w-full cursor-pointer items-center transition-all duration-300 ease-in-out active:scale-95 ${
                isHorizontal ? 'justify-center gap-0 px-0 py-2' : 'gap-2.5 px-3 py-2 text-left'
              }`}
            >
              <div
                className={`flex shrink-0 items-center justify-center rounded-lg border-2 p-1.5 transition-colors duration-300 ${colors.icon}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  {item.icon}
                </svg>
              </div>
              {!isHorizontal && (
                <span className={`font-semibold whitespace-nowrap transition-colors duration-300 ${colors.text}`}>
                  {item.label}
                </span>
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
