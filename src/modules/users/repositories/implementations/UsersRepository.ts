import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  private getUser(field: string, value): User | undefined {
    const user = this.users.find((u) => u[field] === value);

    return user;
  }

  private getUserIndex(id: string): number {
    return this.users.findIndex((u) => u.id === id);
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.getUser("id", id);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.getUser("email", email);
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.getUserIndex(receivedUser.id);

    const user = {
      ...this.users[userIndex],
      admin: true,
      updated_at: new Date(),
    };

    this.users[userIndex] = user;

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
