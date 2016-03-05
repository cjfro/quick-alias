# quick-alias

Quickly create an alias for the previous run command.

# Installation

Install using [npm](http://npmjs.org):

```

sudo npm install -g quick-alias

```

Add the following to your `.bash_profile`:

```

alias make-alias='history | quick-alias $1'

```

# Usage

```

$ make-alias my-new-alias-name

```