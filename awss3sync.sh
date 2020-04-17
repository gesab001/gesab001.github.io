#!/bin/bash
aws s3 sync . s3://bible.onecloudapps.net/ --exclude "awss3sync.sh"
aws cloudfront create-invalidation --distribution-id E1Y1QUA61Y9YDC --paths "/*"
#arn:aws:iam::928050022863:role/lambda_invoke_function_assume_apigw_role
