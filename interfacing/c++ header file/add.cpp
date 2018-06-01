#include "add.h"

ADD::ADD(int x,int y)
{
  gx = x;
  gy = y;
}

int ADD::getSum()
{
  return gx + gy;
}