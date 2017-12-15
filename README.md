# Ruby on AWS Lambda

First, read more about [traveling ruby](http://phusion.github.io/traveling-ruby/).

- Fork & clone the repository
- Configure your package details in `config.yml`
- run `rake package:<package>` e.g. `rake package:linux:x86_64`
- Upload to AWS Lambda and set handler name to `index.handler`

Read more:
 - [Scripting languages for AWS Lambda. Running PHP, Ruby and Go](https://aws.amazon.com/blogs/compute/scripting-languages-for-aws-lambda-running-php-ruby-and-go/)
 - [Using Ruby with ActiveRecord in AWS Lambda](http://www.adomokos.com/2016/06/using-ruby-with-activerecord-in-aws.html)
