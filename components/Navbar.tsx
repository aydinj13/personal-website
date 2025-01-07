'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from "next/image"
import { Button } from './ui/button'
import Link from 'next/link'

const routes = [
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Ventures', href: '/ventures' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Newsletter', href: '/newsletter' },
  { name: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 w-full backdrop-blur-sm bg-white/50 z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              alt=""
              src="/logo.png"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {routes.map((item) => (
            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 hover:text-gray-600 transition-colors">
              {item.name}
            </a>
          ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button variant="outline" asChild>
            <Link href="/contact">
            Contact
            </Link>
          </Button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-transparent backdrop-blur-lg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/5">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt=""
                src="/logo.png"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-600 transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {routes.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-white/10 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-white/10 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}