from greetings import greetings
from faker import Faker

if __name__ == "__main__":
    fake = Faker()
    greetings.say_hello()
    for _ in range(5):
        name = fake.name()
        greetings.say_hello(name)
