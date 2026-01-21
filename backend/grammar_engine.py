from sanskrit_parser import Parser
from indic_transliteration.sanscript import transliterate
from indic_transliteration import sanscript

_parser = None  # lazy-loaded singleton


def get_parser():
    global _parser
    if _parser is None:
        _parser = Parser()
    return _parser


def check_sanskrit_sentence(sentence: str):
    """
    Checks whether a Sanskrit sentence is grammatically parsable
    """
    try:
        parser = get_parser()

        # Convert Devanagari → IAST
        iast_sentence = transliterate(
            sentence,
            sanscript.DEVANAGARI,
            sanscript.IAST
        )

        parses = list(parser.parse(iast_sentence))

        if parses:
            return {
                "valid": True,
                "analysis": "Sentence is grammatically valid.",
                "parse_count": len(parses),
            }
        else:
            return {
                "valid": False,
                "analysis": "Sentence could not be parsed grammatically.",
                "parse_count": 0,
            }

    except Exception as e:
        return {
            "valid": False,
            "analysis": f"Error during parsing: {str(e)}",
            "parse_count": 0,
        }
