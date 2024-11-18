import type { User } from "@/api/users/Models/UserModel";
import { UsersRepository } from "@/api/users/UsersRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";


export class UsersService {
  private usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async findAll(): Promise<ServiceResponse<User[] | null>> {
    try {
      const usersResponse: ServiceResponse<User[] | null> = await this.usersRepository.findAllAsync();
      if (usersResponse.success) {
        const users = usersResponse.responseObject || [];
        return ServiceResponse.success<User[]>("Users found", users);
      } else {
        return ServiceResponse.failure<User[]>(
            usersResponse.message || "Users not found",
            [],
            usersResponse.statusCode || StatusCodes.NOT_FOUND,
        );
      }
    } catch (error) {
      const errorMessage = `Error finding all users: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure(
          "An error occurred while retrieving users.",
          [],
          StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}