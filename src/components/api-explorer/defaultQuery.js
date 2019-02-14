const defaultQuery = `#
#
# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that starts
# with a # are ignored.
#
# Keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#

# E.g. Search Charity Commission charities for "mind",
# counting the total number of results and listing the id, name & activities of the top 3 results:

{
  CHC {
    getCharities(filters: {search: "mind"}) {
      count
      list(limit: 3) {
        id
        name
        activities
      }
    }
  }
}

`

export default defaultQuery