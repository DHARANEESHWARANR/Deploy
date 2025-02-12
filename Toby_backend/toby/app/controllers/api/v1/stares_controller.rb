class Api::V1::StaresController < ApplicationController
    def modify
        puts "Hello World Asvinnn";
        puts params[:collection_id];
        collection = Collection.find(params[:collection_id]);
        puts collection;
        collection[:stared] = !collection[:stared];
        p collection;
        collection.save
    end
end