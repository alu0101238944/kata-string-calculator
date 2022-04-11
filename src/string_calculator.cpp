
#include "../include/string_calculator.h"

StringCalculator::StringCalculator(void) {
  delimiters_ = {",", "\n"};
}

StringCalculator::~StringCalculator() {}

std::string StringCalculator::setDelimiters(std::string expression) {
  if (expression[0] == expression[1] && expression[1] == '/') {
    delimiters_ = {std::string(1, expression[2])};
    expression.erase(0, 4);
  }
  return expression;
}

int StringCalculator::add(std::string expression) {
  expression = setDelimiters(expression);
  std::vector<std::string> splittedExpression = splitByDelimiters(expression);
  int result = 0;
  for (int i = 0; i < splittedExpression.size(); i++) {
    result += std::stoi(splittedExpression[i]);
  }
  return result;
}

std::vector<std::string> StringCalculator::splitByDelimiters(std::string expression) {
  std::string accumulator = "";
  std::vector<std::string> splitted = {};
  size_t i = 0;
  while (i < expression.size()) {
    bool foundDelimiter = false;
    for (size_t j = 0; j < delimiters_.size(); j++) {
      bool isDelimiter = true;
      for (size_t k = 0; k < delimiters_[j].size(); k++) {
        if (expression[i + k] != delimiters_[j][k]) {
          isDelimiter = false;
          break;
        }
      }
      if (isDelimiter) {
        foundDelimiter = true;
        splitted.push_back(accumulator);
        i += accumulator.size();
        accumulator = "";
        break;
      }
    }
    if (!foundDelimiter) {
      accumulator += expression[i];
      i++;
    }
  }
  if (accumulator != "") {
    splitted.push_back(accumulator);
  }
  return splitted;
}
