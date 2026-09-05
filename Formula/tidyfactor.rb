class Tidyfactor < Formula
  desc "Universal AI Coding Agent Skill Ecosystem & Multi-Platform CLI"
  homepage "https://tidyfactor.com"
  url "https://registry.npmjs.org/@tidyfactor/cli/-/cli-2.1.0.tgz"
  sha256 "d3e1b40aca1da5de34c180e2af2cdbd52137370385501b0332500ee182302ad8"
  license "Apache-2.0"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    output = shell_output("#{bin}/tidyfactor --version")
    assert_match "2.1.0", output

    list_output = shell_output("#{bin}/tidyfactor list")
    assert_match "tidyfactor-cinematic", list_output
  end
end
