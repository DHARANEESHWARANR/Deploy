class Api::V1::BookmarksController < ApplicationController
    def create
      collection = Collection.find_by(id: params[:collection_id]);
      if collection
        bookmark  = collection.bookmarks.new(bookmark_params);
        if bookmark.save
          render json: {message: "BoookMarks Created Sucessfully" , bookmark: bookmark} , status: :ok
        else
          render json: { message: "Failed to Create BookMark", errors: bookmark.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: {message: "Collection is Not Found"}, status: :not_found
      end
    end
    
    def index
        bookmarks = Bookmark.where(collection_id: params[:collection_id])
        if bookmarks.any?
            render json: {message: "Here Your Bookmarks" , bookmarks: bookmarks} , status: :ok
        else
            render json: {message: "No Bookmarks Available For This Collections"} , status: :not_found
        end
    end
    
    def update 
        current_bookmark = Bookmark.find_by(id: params[:id]) # Use params[:id] for the URL param ID
        if current_bookmark
          current_bookmark.title = params[:bookmark][:title]
          current_bookmark.description = params[:bookmark][:description]
          if current_bookmark.save
            render json: { message: "Bookmark Updated successfully", bookmark: current_bookmark }, status: :ok
          else
            render json: { message: "Failed to update Bookmark", errors: current_bookmark.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { message: "BookMark not found" }, status: :not_found
        end
      end

    def destroy
        bookmark = Bookmark.find_by(id: params[:id])
        if bookmark
          bookmark.destroy
          render json: {message: "Bookmark deleted sucessfully"} , status: :ok
        else
          render json: { message: "Bookmark not found"}, status: :not_found
        end
    end

    private
     def bookmark_params
        params.require(:bookmark_params).permit(:url, :title, :description , :collection_id)
     end
end
