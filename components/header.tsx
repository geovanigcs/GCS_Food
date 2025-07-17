"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, User, LogOut, Settings, BookOpen, Search, Menu, X, Sun, Moon, Plus, Wine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "./auth-modal"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function Header() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar busca
    console.log("Buscar:", searchQuery)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-amber-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center gap-2">
                <ChefHat className="w-8 h-8 text-amber-600 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  GCS Food
                </span>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
              >
                Início
              </Link>
              <Link
                href="/receitas"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
              >
                Receitas
              </Link>
              <Link
                href="/nacionalidades"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
              >
                Nacionalidades
              </Link>
              <Link
                href="/categorias"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
              >
                Categorias
              </Link>
              <Link
                href="/harmonizacao"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
              >
                Harmonização
              </Link>
              {user && (
                <Link
                  href="/adicionar-harmonizacao" // Novo link para adicionar harmonização
                  className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                >
                  Adicionar Harmonização
                </Link>
              )}
              {user && (
                <Link
                  href="/adicionar-receita"
                  className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                >
                  Adicionar Receita
                </Link>
              )}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Buscar receitas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-12 py-2 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 px-3"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* User Area & Theme Toggle */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-amber-50 dark:hover:bg-gray-700"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {user ? (
                <div className="relative">
                  <Button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    variant="ghost"
                    className="flex items-center gap-3 hover:bg-amber-50 dark:hover:bg-gray-700 rounded-full px-4 py-2"
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                    )}
                    <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-300">
                      {user.firstName} {user.lastName}
                    </span>
                  </Button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <p className="font-semibold text-gray-800 dark:text-gray-200">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>

                        <Link
                          href="/perfil"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span>Meu Perfil</span>
                        </Link>

                        <Link
                          href="/minhas-receitas"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span>Minhas Receitas</span>
                        </Link>

                        <Link
                          href="/minhas-harmonizacoes" // Você pode criar esta página depois, se quiser listar as harmonizações do usuário
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Wine className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span>Minhas Harmonizações</span>
                        </Link>
                        <Link
                          href="/adicionar-harmonizacao"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors text-amber-600 dark:text-amber-400"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar Harmonização</span>
                        </Link>

                        <Link
                          href="/adicionar-receita"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors text-amber-600 dark:text-amber-400"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar Receita</span>
                        </Link>

                        <Link
                          href="/configuracoes"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span>Configurações</span>
                        </Link>

                        <hr className="my-2 border-gray-100 dark:border-gray-700" />

                        <button
                          onClick={() => {
                            logout()
                            setShowUserMenu(false)
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900 transition-colors text-red-600 dark:text-red-400 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sair</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Entrar
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-amber-50 dark:hover:bg-gray-700"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-gray-100 dark:border-gray-700 py-4"
              >
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                  >
                    Início
                  </Link>
                  <Link
                    href="/receitas"
                    className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                  >
                    Receitas
                  </Link>
                  <Link
                    href="/nacionalidades"
                    className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                  >
                    Nacionalidades
                  </Link>
                  <Link
                    href="/categorias"
                    className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                  >
                    Categorias
                  </Link>
                  <Link
                    href="/harmonizacao"
                    className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                  >
                    Harmonização
                  </Link>
                  {user && (
                    <Link
                      href="/adicionar-harmonizacao"
                      className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                    >
                      Adicionar Harmonização
                    </Link>
                  )}
                  {user && (
                    <Link
                      href="/adicionar-receita"
                      className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                    >
                      Adicionar Receita
                    </Link>
                  )}
                </nav>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mt-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Buscar receitas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-4 pr-12 py-2 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 px-3"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}
