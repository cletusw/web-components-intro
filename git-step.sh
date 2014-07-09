#!/bin/bash

show_usage () {
  echo "Usage: `basename $0` [START [END]] [options]"
  echo
  echo "Steps through the commit history from START to END,"
  echo "then returns to the branch or commit from before execution."
  echo
  echo "START defaults to the root commit (beginning of history)."
  echo "END defaults to current branch/commit."
  echo
  echo "Available options:"
  echo "   --root-offset NUM"
  echo "      Ignores START and END and instead begins NUM commits"
  echo "      past the root commit and ends at current branch/commit."
}

initial_branch=$(git symbolic-ref --short -q HEAD)
initial_commit=$(git rev-parse HEAD)
reset_to=${initial_branch:-${initial_commit:-"master"}}
num_args=$#

if [[ ( $1 == "--help" ) || $1 == "-h" ]]; then
  show_usage
  exit 0
elif [[ $1 == "--root-offset" ]]; then
  offset=${2:-0}
  num_args=0
fi

if [ $num_args -eq 0 ]; then
  end=$reset_to
elif [ $num_args -eq 1 ]; then
  start="^$1^"
  end=$reset_to
elif [ $num_args -eq 2 ]; then
  start="^$1^"
  end=$2
else
  show_usage
  exit 1
fi

trap "git checkout $reset_to; exit 1" INT

for commit in $(git rev-list $end $start --reverse); do
  if [[ $offset == 0 ]]; then
    git reset --hard HEAD
    git checkout $commit
    read
  else
    let "offset -= 1"
  fi
done

git checkout $reset_to
