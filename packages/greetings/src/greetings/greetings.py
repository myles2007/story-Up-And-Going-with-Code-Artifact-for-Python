from typing import Optional


def get_greeting(name: Optional[str] = None) -> str:

    return f"Hello there, {'friend' if name is None else name}!"


def say_hello(name: Optional[str] = None) -> None:
    print(get_greeting(name))
