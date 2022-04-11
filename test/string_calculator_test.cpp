#include <gtest/gtest.h>
#include "../include/string_calculator.h"

TEST(StringCalculator, shouldSumNumbersSeparatedByCommas) {
  StringCalculator stringCalculator;

  EXPECT_EQ(stringCalculator.add(""), 0);
  EXPECT_EQ(stringCalculator.add("1"), 1);
  EXPECT_EQ(stringCalculator.add("1,2"), 3);
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

