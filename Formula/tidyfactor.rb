class Tidyfactor < Formula
  desc "Universal AI Coding Agent Skill Ecosystem & Multi-Platform CLI"
  homepage "https://tidyfactor.com"
  url "https://registry.npmjs.org/@tidyfactor/cli/-/cli-2.2.0.tgz"
  license "Apache-2.0"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    output = shell_output("#{bin}/tidyfactor --version")
    assert_match "2.2.0", output

    list_output = shell_output("#{bin}/tidyfactor list")
    assert_match "tidyfactor-cinematic", list_output
  end
end
