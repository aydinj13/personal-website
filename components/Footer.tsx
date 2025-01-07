import React from 'react';
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Github, 
  Linkedin, 
  Mail,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Ventures', href: '/ventures' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "https://x.com/aydinjoshi", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/aydinjoshi.siu/", label: "Instagram" },
    { icon: <Youtube className="h-5 w-5" />, href: "https://www.youtube.com/balleraydin", label: "YouTube" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/aydinj13", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Coffee className="h-5 w-5" />, href: "https://buymeacoffee.com/aydinjoshi", label: "Buy Me a Coffee" }
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Aydin Joshi</h3>
            <p className="text-gray-600">
              Helping developers build better applications through tutorials, 
              courses, and consulting.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-600">Business Inquiries:</p>
              <a 
                href="mailto:aydin@aydinjoshi.com"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                aydin@aydinjoshi.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Follow Me</h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <a
                    href={social.href}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div>
            © {currentYear} Aydin Joshi. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;