class Tidyfactor < Formula
  desc "Universal AI Coding Agent Skill Ecosystem & Multi-Platform CLI"
  homepage "https://tidyfactor.com"
  url "https://registry.npmjs.org/@tidyfactor/cli/-/cli-1.7.0.tgz"
  sha256 "db1426e9700bd33041d37c1a8568c5177b470a7b10e1dc00dcf7cd8c77530770"
  license "Apache-2.0"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    output = shell_output("#{bin}/tidyfactor --version")
    assert_match "1.7.0", output

    list_output = shell_output("#{bin}/tidyfactor list")
    assert_match "tidyfactor-cinematic", list_output
  end
end
