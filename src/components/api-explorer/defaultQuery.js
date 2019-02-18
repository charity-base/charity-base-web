const defaultQuery = `# Welcome to GraphiQL
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

# E.g. Search charities operating in Hounslow for "mind", returning:
# - A count of all matching charities
# - A list of the top 3 matches (with their id, name & activities)

{
  CHC {
    getCharities(filters: {
      search: "mind"
      areas: {
        some: ["B-25"]
      }
    }) {
      count
      list(limit: 3) {
        id
        name
        activities
      }
    }
  }
}

# Hint: try changing the search term or limit value in the query above.
# Press the play button to re-run the query.
`

export default defaultQuery