import type { User } from "@/api/users/Models/UserModel";
import { UsersRepository } from "@/api/users/UsersRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import type {Opportunity} from "@/api/opportunities/OpportunitiesModel";


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
  
  public async findById(id: string): Promise<ServiceResponse<User | null>> {
    try {
      const userResponse: ServiceResponse<User | null> = await this.usersRepository.findByIdAsync(id);
      if (userResponse.success) {
        const user = userResponse.responseObject || null;
        return ServiceResponse.success("User found", user);
      } else {
        return ServiceResponse.failure(
            userResponse.message || "User not found",
            null,
            userResponse.statusCode || StatusCodes.NOT_FOUND,
        );
      }
    } catch (error) {
      const errorMessage = `Error finding user by id: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure(
          "An error occurred while retrieving user.",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  public async create(user: User): Promise<ServiceResponse<User | null>> {
    try {
      const userResponse: ServiceResponse<User | null> = await this.usersRepository.createAsync(user);
      if (userResponse.success) {
        const user = userResponse.responseObject || null;
        return ServiceResponse.success("User created", user);
      } else {
        return ServiceResponse.failure(
            userResponse.message || "User not created",
            null,
            userResponse.statusCode || StatusCodes.BAD_REQUEST,
        );
      }
    } catch (error) {
      const errorMessage = `Error creating user: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure(
          "An error occurred while creating user.",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  public async update(id: string, user: Partial<User>): Promise<ServiceResponse<User | null>> {
    try {
      const userResponse: ServiceResponse<User | null> = await this.usersRepository.updateAsync(id, user);
      if (userResponse.success) {
        const user = userResponse.responseObject || null;
        return ServiceResponse.success("User updated", user);
      } else {
        return ServiceResponse.failure(
            userResponse.message || "User not updated",
            null,
            userResponse.statusCode || StatusCodes.BAD_REQUEST,
        );
      }
    } catch (error) {
      const errorMessage = `Error updating user: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure(
          "An error occurred while updating user.",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  public async deleteById(id: string): Promise<ServiceResponse<boolean>> {
    try {
      const userResponse: ServiceResponse<boolean> = await this.usersRepository.deleteByIdAsync(id);
      if (userResponse.success) {
        const user = userResponse.responseObject || false;
        return ServiceResponse.success("User deleted", user);
      } else {
        return ServiceResponse.failure(
            userResponse.message || "User not deleted",
            false,
            userResponse.statusCode || StatusCodes.BAD_REQUEST,
        );
      }
    } catch (error) {
      const errorMessage = `Error deleting user: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure(
          "An error occurred while deleting user.",
          false,
          StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  
}