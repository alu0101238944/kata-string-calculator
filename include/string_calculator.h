
#ifndef STRING_CALCULATOR
#define STRING_CALCULATOR

#include <string>
#include <vector>

class StringCalculator {
 private:
  std::vector<std::string> delimiters_;

 public:
  StringCalculator(void);
  ~StringCalculator();

 private:
  std::vector<std::string> splitByDelimiters(std::string expression);

 public:
  int add(std::string expression);
};

#endif
