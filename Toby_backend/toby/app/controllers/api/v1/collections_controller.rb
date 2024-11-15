class Api::V1::CollectionsController < ApplicationController
  def create
    collection = Collection.new(collection_params)
    collection.user_id = params[:collection][:user_id]
    if collection.save
      render json: { message: "Collection created successfully", collection: collection }, status: :created
    else
      render json: { message: "Collection Not Created", collection: collection.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    user_id = params[:user_id]
    collections = Collection.where(user_id: user_id)
    if collections.any?
      render json: { message: "Here are your collections", collections: collections }, status: :ok
    else
      render json: { message: "No collections found", collections: [] }, status: :not_found
    end
  end
  
  def update 
    current_collection = Collection.find_by(id: params[:id]) # Use params[:id] for the URL param ID
    if current_collection
      current_collection.title = params[:collection][:title]
      current_collection.description = params[:collection][:description]
      if current_collection.save
        render json: { message: "Collection updated successfully", collection: Collection.all }, status: :ok
      else
        render json: { message: "Failed to update collection", errors: current_collection.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { message: "Collection not found" }, status: :not_found
    end
  end
    
  def destroy
    collection = Collection.find_by(id: params[:id])
    if collection
      collection.destroy
      render json: {message: "Collection deleted sucessfully"} , status: :ok
    else
      render json: { message: "Collection not found"}, status: :not_found
    end
  end

  private
  
  def collection_params
    params.require(:collection).permit(:title, :description, :user_id)
  end
end
