"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChefHat, Instagram, Facebook, Youtube, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gray-100 dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700 dark:text-gray-300">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <ChefHat className="w-8 h-8 text-amber-600 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              GCS Food
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            Sua plataforma definitiva para explorar e compartilhar o mundo da culinária. Descubra, crie e inspire-se!
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Links Rápidos</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Início
              </Link>
            </li>
            <li>
              <Link href="/receitas" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Receitas
              </Link>
            </li>
            <li>
              <Link href="/nacionalidades" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Nacionalidades
              </Link>
            </li>
            <li>
              <Link href="/harmonizacao" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Harmonização
              </Link>
            </li>
            <li>
              <Link
                href="/adicionar-receita"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                Adicionar Receita
              </Link>
            </li>
            <li>
              <Link
                href="/adicionar-harmonizacao"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                Adicionar Harmonização
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Contato</h3>
          <ul className="space-y-2">
            <li>Email: geovanigcs.dev@gmail.com</li>
            <li>Telefone: (61) 98154-2702</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Siga-nos</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        © Geovani Cordeiro 2025. Todos os direitos reservados.
      </div>
    </motion.footer>
  )
}
