resource "aws_s3_bucket" "beanstalk_release_bucket" {
  bucket        = "spider-sweeper-deploy-bucket"
  force_destroy = true
}
