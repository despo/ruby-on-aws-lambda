require 'yaml'
settings = YAML::load(File.open("config.yml"))

PACKAGE_NAME = settings['package_name']
VERSION = settings['version']
TARGET_RUBY_VERSION = settings['travelling_ruby_version']

desc "Package your app"
task :package => ['package:linux:x86', 'package:linux:x86_64', 'package:osx']

namespace :package do
  namespace :linux do
    desc "Package your app for Linux x86"
    task x86: "packaging/traveling-ruby-#{TARGET_RUBY_VERSION}-linux-x86.tar.gz" do
      create_package("linux-x86")
    end

    desc "Package your app for Linux x86_64"
    task x86_64: "packaging/traveling-ruby-#{TARGET_RUBY_VERSION}-linux-x86_64.tar.gz" do
      create_package("linux-x86_64")
    end
  end

  desc "Package your app for OS X"
  task osx: "packaging/traveling-ruby-#{TARGET_RUBY_VERSION}-osx.tar.gz" do
    create_package("osx")
  end
end

file "packaging/traveling-ruby-#{TARGET_RUBY_VERSION}-linux-x86.tar.gz" do
  download_runtime("linux-x86")
end

file "packaging/traveling-ruby-#{TARGET_RUBY_VERSION}-linux-x86_64.tar.gz" do
  download_runtime("linux-x86_64")
end

file "packaging/traveling-ruby-#{TARGET_RUBY_VERSION}-osx.tar.gz" do
  download_runtime("osx")
end

def package_dir
  @package_dir
end

def create_package_dir
  sh """
  rm -rf #{package_dir}
  mkdir -p #{package_dir}/lib/app
  """
end

def configure_traveling_ruby(target)
  sh """
  mkdir #{package_dir}/lib/ruby
  tar -xzf packaging/traveling-ruby-#{TARGET_RUBY_VERSION}-#{target}.tar.gz -C #{package_dir}/lib/ruby
  rm packaging/traveling-ruby-#{TARGET_RUBY_VERSION}-#{target}.tar.gz
  """
end

def setup_and_bundle_gems
  sh """
  mkdir -p packaging/tmp
  cp Gemfile* packaging/tmp/
  pushd packaging/tmp
  BUNDLE_IGNORE_CONFIG=1 bundle install --path  vendor --without development
  popd
  cp -pR packaging/tmp/vendor #{package_dir}/lib
  mkdir -p #{package_dir}/lib/vendor/.bundle
  cp Gemfile* #{package_dir}/lib/vendor/
  rm -rf packaging/tmp
  """
end

def copy_templates
  sh """
  cp app.rb #{package_dir}/lib/app/
  cp packaging/bundler-config #{package_dir}/lib/vendor/.bundle/config
  cp packaging/wrapper.sh #{package_dir}/app
  cp index.js #{package_dir}/index.js
  """
end

def zip_and_cleanup
  sh """
  chmod 777 #{package_dir}/*
  pushd #{package_dir}
  find . | zip '../#{package_dir}.zip' -@
  popd
  rm -rf #{package_dir}
  """
end

def create_package(target)
  @package_dir ||= "#{PACKAGE_NAME}-#{VERSION}-#{target}"

  create_package_dir
  configure_traveling_ruby(target)
  setup_and_bundle_gems
  copy_templates
  zip_and_cleanup
end

def download_runtime(target)
  sh "cd packaging && curl -L -O --fail " +
    "https://d6r77u77i8pq3.cloudfront.net/releases/traveling-ruby-#{TARGET_RUBY_VERSION}-#{target}.tar.gz"
end
