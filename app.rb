#!../bin/ruby
require 'json'
require 'dogeify'

begin
  if ARGV.empty?
    puts "No input? Try again."
    exit
  end

  input = JSON.parse(ARGV[0])["human"]
  puts Dogeify.new.process(input)
rescue Exception => e
  puts e.inspect
end
