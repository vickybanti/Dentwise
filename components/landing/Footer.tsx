import Image from "next/image";

function Footer() {
    return (
        <footer className="px-6 py-12 border-t border-black bg-black">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="DentWise Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                            <span className="font-semibold text-lg">DentWise</span>
                        </div>
                        <p className="text-sm text-white/80">
                            AI-powered dental assistance that actually helps.
                        </p>
                    </div>

                    <div className="text-white/70">
                        <h4 className="font-medium mb-3">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    How it works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="text-white/70">
                        <h4 className="font-medium mb-3">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Help center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Contact us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Status
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="text-white/70">
                        <h4 className="font-medium mb-3">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Security
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; 2024 DentWise. Built for real people with real dental questions.</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
