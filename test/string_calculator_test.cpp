#include <gtest/gtest.h>
#include "../include/string_calculator.h"
#include <iostream>

TEST(StringCalculator, shouldSumNumbersSeparatedByCommas) {
  StringCalculator stringCalculator;

  EXPECT_EQ(stringCalculator.add(""), 0);
  EXPECT_EQ(stringCalculator.add("1"), 1);
  EXPECT_EQ(stringCalculator.add("1,2"), 3);
  EXPECT_EQ(stringCalculator.add("12,12,12"), 36);
}

TEST(StringCalculator, shouldSumNumbersSeparatedByCommasOrNewLines) {
  StringCalculator stringCalculator;

  EXPECT_EQ(stringCalculator.add("1\n2"), 3);
  EXPECT_EQ(stringCalculator.add("2\n3\n4"), 9);
  EXPECT_EQ(stringCalculator.add("2\n3,4"), 9);
}

TEST(StringCalculator, shouldSupportDifferentDelimiters) {
  StringCalculator stringCalculator;

  EXPECT_EQ(stringCalculator.add("//;\n1;2"), 3);
  EXPECT_EQ(stringCalculator.add("//;\n2;3;4"), 9);
  EXPECT_EQ(stringCalculator.add("//*\n6*4*10"), 20);
  EXPECT_EQ(stringCalculator.add("//+\n6+4+5+15"), 30);
}

TEST(StringCalculator, shouldNotAllowNegativesNumbers) {
  StringCalculator stringCalculator;

  try {
    stringCalculator.add("-1,2");
    EXPECT_EQ("", "The exception was not thrown");
  } catch(const std::string& error) {
    EXPECT_EQ("Negatives are not allowed: -1", error);
  }
  try {
    stringCalculator.add("1,-2");
    EXPECT_EQ("", "The exception was not thrown");
  } catch(const std::string& error) {
    EXPECT_EQ("Negatives are not allowed: -2", error);
  }
  try {
    stringCalculator.add("1,-2,-3");
    EXPECT_EQ("", "The exception was not thrown");
  } catch(const std::string& error) {
    EXPECT_EQ("Negatives are not allowed: -2, -3", error);
  }
}

TEST(StringCalculator, shouldNotSumNumbersBiggerThanThousand) {
  StringCalculator stringCalculator;

  EXPECT_EQ(stringCalculator.add("1,2,1001"), 3);
  EXPECT_EQ(stringCalculator.add("1,2,91201,3"), 6);
}
