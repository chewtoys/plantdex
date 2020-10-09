package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	spa "github.com/roberthodgen/spa-server"
)

func main() {
	godotenv.Load()

	fs := spa.SpaHandler("dist", "index.html")

	fmt.Println("Web server ready ✅")

	go http.ListenAndServeTLS(":443", "/etc/letsencrypt/live/plantdex.ml/fullchain.pem", "/etc/letsencrypt/live/plantdex.ml/privkey.pem", corsWrapper(httpWrapper(fs)))
	http.ListenAndServe(":80", corsWrapper(httpWrapper(http.HandlerFunc(redirectToHTTPS))))
}

func redirectToHTTPS(w http.ResponseWriter, r *http.Request) {
	domain := strings.Split(r.Host, ":")[0]

	http.Redirect(w, r, "https://"+domain+r.URL.Path,
		http.StatusMovedPermanently)
}

func httpWrapper(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Server", "go")

		h.ServeHTTP(w, r)
	}
}

func corsWrapper(h http.Handler) http.HandlerFunc {
	apiURL := os.Getenv("API_URL")

	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Security-Policy", "default-src 'self' "+apiURL)
		w.Header().Add("Referrer-Policy", "strict-origin-when-cross-origin")
		w.Header().Add("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
		w.Header().Add("X-Content-Type-Options", "nosniff")
		w.Header().Add("X-Frame-Options", "SAMEORIGIN")
		w.Header().Add("X-XSS-Protection", "1; mode=block")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		h.ServeHTTP(w, r)
	}
}
