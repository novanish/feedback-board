export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-card border-t">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-card-foreground mb-4 font-semibold">
              Feedback Hub
            </h3>
            <p className="text-muted-foreground text-sm">
              Collect, manage, and prioritize user feedback in one place.
            </p>
          </div>

          <div>
            <h4 className="text-card-foreground mb-4 text-sm font-semibold">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-card-foreground mb-4 text-sm font-semibold">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-card-foreground mb-4 text-sm font-semibold">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border border-t pt-8">
          <p className="text-muted-foreground text-center text-sm">
            &copy; {currentYear} Feedback Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
